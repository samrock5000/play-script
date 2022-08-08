import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer>
      <div
        className="footer-description"
        style={{
          padding: '16px 0px',
          overflow: 'hidden',
          position: 'absolute',
          width: '100%',
          textAlign: 'center',
          bottom: '0px',
          color: '#fff',
          background: 'black'
      }}>
        <a href="https://github.com/samrock5000" target="_blank" rel="noopener noreferrer">Cooming Soon</a>
      </div>
    </footer>
  )
}

export default Footer
