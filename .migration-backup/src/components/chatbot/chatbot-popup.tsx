
'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from '@/components/ui/prompt-input'
import { ArrowUp, Bot, Square, X, User, Mic, Volume2, Loader2, Pause, Play, Languages } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { jaagaAiAssistant } from '@/ai/flows/jaaga-ai-assistant'
import { textToSpeech } from '@/ai/flows/text-to-speech'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


type Message = {
  role: 'user' | 'bot'
  text: string
  audioData?: string;
  isAudioLoading?: boolean;
}

type AudioState = {
  index: number | null;
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
};

export function ChatbotPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Hello! I am JaaGa’s AI Assistant. How can I help you with your property questions today?',
    },
  ])
  const [activeAudio, setActiveAudio] = useState<AudioState>({ index: null, audio: null, isPlaying: false });
  const [speechLanguage, setSpeechLanguage] = useState<'en' | 'te'>('en');

  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.lang = speechLanguage === 'te' ? 'te-IN' : 'en-US'
        recognitionRef.current.interimResults = false

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [speechLanguage])


  // Auto-scroll to bottom on new message
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      'div[data-radix-scroll-area-viewport]'
    )
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    return () => {
        activeAudio.audio?.pause();
    };
  }, [activeAudio.audio]);

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop()
      } else {
        recognitionRef.current.start()
      }
      setIsListening(!isListening)
    } else {
      alert('Speech recognition is not supported in your browser.')
    }
  }

  const generateAndSetAudio = async (text: string, messageIndex: number) => {
    try {
      const response = await textToSpeech({ text, language: speechLanguage });
      setMessages(prev => {
        const newMessages = [...prev];
        if(newMessages[messageIndex]) {
          newMessages[messageIndex] = { ...newMessages[messageIndex], audioData: response.audio, isAudioLoading: false };
        }
        return newMessages;
      });
    } catch (error) {
      console.error('Failed to generate audio:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        if(newMessages[messageIndex]) {
          newMessages[messageIndex] = { ...newMessages[messageIndex], isAudioLoading: false };
        }
        return newMessages;
      });
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', text: input };
    const botMessagePlaceholder: Message = { role: 'bot', text: '', isAudioLoading: true };

    setMessages(prev => [...prev, userMessage, botMessagePlaceholder]);
    const botMessageIndex = messages.length + 1;
    
    setInput('')
    setIsLoading(true)

    try {
      const response = await jaagaAiAssistant(input)
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[botMessageIndex]) {
            newMessages[botMessageIndex] = { ...newMessages[botMessageIndex], text: response };
        }
        return newMessages;
      });
      generateAndSetAudio(response, botMessageIndex);
    } catch {
      const errorMessage = 'Sorry, something went wrong. Please try again later.';
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[botMessageIndex]) {
            newMessages[botMessageIndex] = { role: 'bot', text: errorMessage, isAudioLoading: false };
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false)
    }
  }

 const handlePlayAudio = (audioData: string, index: number) => {
    // If clicking the currently playing audio, toggle pause/play
    if (activeAudio.index === index && activeAudio.audio) {
      if (activeAudio.isPlaying) {
        activeAudio.audio.pause();
        setActiveAudio(prev => ({ ...prev!, isPlaying: false }));
      } else {
        activeAudio.audio.play();
        setActiveAudio(prev => ({ ...prev!, isPlaying: true }));
      }
      return;
    }

    // Stop any currently playing audio
    if (activeAudio.audio) {
      activeAudio.audio.pause();
      activeAudio.audio.currentTime = 0;
    }

    // Create and play new audio
    const newAudio = new Audio(audioData);
    newAudio.play();
    newAudio.onended = () => {
      setActiveAudio({ index: null, audio: null, isPlaying: false });
    };
    setActiveAudio({ index, audio: newAudio, isPlaying: true });
  };


  return (
    <>
      {/* BOT BUTTON */}
      <div className="fixed bottom-4 right-4 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full w-14 h-14 bg-primary shadow-lg"
                onClick={() => setIsOpen(true)}
              >
                <Bot className="h-7 w-7" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>JaaGa Bot</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* CHAT CARD */}
      <div
        className={cn(
          'fixed z-50 transition-all duration-300',
          'bottom-4 right-4 sm:bottom-24 sm:right-4',
          'w-[calc(100vw-2rem)] h-[calc(100vh-5rem)] sm:w-[380px] sm:h-[500px]',
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        )}
      >
        <Card className="w-full h-full flex flex-col shadow-xl">
          {/* HEADER (FIXED) */}
          <CardHeader className="shrink-0 flex flex-row items-center justify-between border-b">
             <div className='flex items-center gap-2'>
              <Bot className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">JaaGa Bot</CardTitle>
            </div>
            <div className="flex items-center gap-1">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Languages className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={() => setSpeechLanguage('en')} className={cn(speechLanguage === 'en' && 'bg-accent')}>English</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSpeechLanguage('te')} className={cn(speechLanguage === 'te' && 'bg-accent')}>Telugu</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
            </div>
          </CardHeader>

          {/* MESSAGES (ONLY THIS SCROLLS) */}
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            <ScrollArea className="flex-1 px-4" ref={scrollRef}>
              <div className="space-y-4 py-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      msg.role === 'user' && 'justify-end'
                    )}
                  >
                    {msg.role === 'bot' && (
                      <div className="bg-primary text-primary-foreground p-2 rounded-full shrink-0">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}

                    <div
                      className={cn(
                        'p-3 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap',
                        msg.role === 'bot'
                          ? 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      )}
                    >
                      {msg.text ? msg.text : <Loader2 className="w-5 h-5 animate-spin"/>}
                       {msg.role === 'bot' && msg.text && (
                        <div className="mt-2">
                           {msg.isAudioLoading ? (
                             <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                           ) : msg.audioData ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handlePlayAudio(msg.audioData!, index)}
                            >
                              {activeAudio.index === index && activeAudio.isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                          ) : null}
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="bg-muted p-2 rounded-full shrink-0">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && !messages.some(m => m.role === 'bot' && !m.text) && (
                  <div className="flex gap-3">
                    <div className="bg-primary p-2 rounded-full">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-muted px-4 py-3 rounded-lg">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
    
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>

          {/* INPUT (FIXED) */}
          <div className="shrink-0 border-t p-4">
            <PromptInput
              value={input}
              onValueChange={setInput}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            >
              <PromptInputTextarea placeholder="Ask me anything…" />
              <PromptInputActions className="justify-end pt-2">
                 <PromptInputAction tooltip="Voice Input">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full"
                    onClick={handleVoiceInput}
                    disabled={isLoading}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? 'text-red-500' : ''}`} />
                  </Button>
                </PromptInputAction>
                <PromptInputAction tooltip="Send">
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={handleSubmit}
                    disabled={!input || isLoading}
                  >
                    {isLoading ? (
                      <Square className="h-4 w-4 fill-current" />
                    ) : (
                      <ArrowUp className="h-4 w-4" />
                    )}
                  </Button>
                </PromptInputAction>
              </PromptInputActions>
            </PromptInput>
          </div>
        </Card>
      </div>
    </>
  )
}
