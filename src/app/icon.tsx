import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '128px',
          background: '#090909',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '12px solid #D4AF37',
          position: 'relative',
        }}
      >
        {/* Abstract Stylized G & Vinyl Symbol */}
        <div
          style={{
            color: '#D4AF37',
            fontSize: '260px',
            fontWeight: 900,
            fontFamily: 'sans-serif',
            letterSpacing: '-10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          G
        </div>
      </div>
    ),
    { ...size }
  );
}
