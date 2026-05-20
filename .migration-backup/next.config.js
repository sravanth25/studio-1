/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '3m9tp1dbzk.ucarecd.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jaaga.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:path*',
        destination: '/blogs/:path*',
        permanent: true,
      },
      {
        source: '/$',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blogs/how-to-download-certified-encumbrance-certificate-ec-telangana-guide',
        destination: '/blogs/how-to-download-certified-encumbrance-certificate-ec-in-telangana-step-by-step-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-download-mutation-certificate-in-telangana-jaaga',
        destination: '/blogs/apply-for-property-mutation-in-telangana-complete-guide-2025',
        permanent: true,
      },
      {
        source: '/blogs/how-to-download-fmb-village-maps-andhra-pradesh-online',
        destination: '/blogs/fmb-sketch-in-tamil-nadu-how-to-view-download-check-fmb-map-online-complete-guide-2026',
        permanent: true,
      },
      {
        source: '/blogs/tgspdcl-electricity-services-bill-payment-name-transfer-guide-telangana',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/how-jaagaai-simplifies-electricity-bill-name-change-in-telangana',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/ts-electricity-bill-name-change-tgspdcl',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/download-property-tax-receipt-telangana-jaaga-app',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/a-guide-to-property-tax-in-telangana',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/why-update-owner-name-on-property-tax-and-electricity-bills',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/navigating-legal-property-verification',
        destination: '/category/legal-verification',
        permanent: true,
      },
      {
        source: '/blogs/comprehensive-guide-to-property-audit-in-india',
        destination: '/category/property-audit',
        permanent: true,
      },
      {
        source: '/blogs/essential-property-documents-for-home-loan',
        destination: '/blogs/title-verification-legal-opinion-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-digital-land-surveys-are-changing-real-estate',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/retrieve-property-documents-online',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/securing-your-investment-with-digital-property-ownership',
        destination: '/blogs/bhu-aadhaar-ulpin-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-download-telangana-pattadar-passbook-pahani-online',
        destination: '/blogs/adangal-ror-1b-land-records-guide',
        permanent: true,
      },
      {
        source: '/blogs/how-to-download-sale-deed-certified-copy-telangana-online-jaaga',
        destination: '/blogs/how-to-download-andhra-pradesh-certified-copy-online-using-jaaga',
        permanent: true,
      },
      {
        source: '/blogs/https=',
        destination: '/blogs',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
