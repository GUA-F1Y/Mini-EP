import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '40px',
          background: '#090909',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid #D4AF37',
          color: '#D4AF37',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: '92px',
            fontWeight: 900,
            color: '#D4AF37',
            letterSpacing: '-2px',
          }}
        >
          G
        </div>
      </div>
    ),
    { ...size }
  );
}
