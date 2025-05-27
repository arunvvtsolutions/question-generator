/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neetguide.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "qbank.csprep.in",
        port: "",
        pathname: "/HTML/**",
      },
    ],
    

  },
  redirects: async () => {
    return [
      {
        source: "/revision-notes/physics/class-xi-physics-and-measurement",
        destination: "/revision-notes/physics/class-xi-units-and-measurement",
        permanent: true,
      },
      {
        source: "/revision-notes/physics/class-xi-kinematics",
        destination:
          "/revision-notes/physics/class-xi-motion-in-a-straight-line",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
