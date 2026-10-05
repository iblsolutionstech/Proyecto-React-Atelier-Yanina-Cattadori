import PropTypes from 'prop-types'

function EmptyFrame({ variant = 'hung' }) {
  return (
    <div className={`empty-frame empty-frame-${variant}`} aria-hidden="true">
      <span className="empty-frame-window" />
    </div>
  )
}

EmptyFrame.propTypes = {
  variant: PropTypes.oneOf(['hung', 'fallen']),
}

export default EmptyFrame
