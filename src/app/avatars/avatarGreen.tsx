import { TAvatar } from './avatarType'

const AvatarGreen = ({ width = '40', height = '40', className }: TAvatar) => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
    >
      <mask id=":rv:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <rect width="36" height="36" fill="#FFFFFF" rx="72"></rect>
      </mask>
      <g mask="url(#:rv:)">
        <rect width="36" height="36" fill="#c4e418"></rect>
        <rect x="0" y="0" width="36" height="36" transform="translate(-3 7) rotate(227 18 18) scale(1.2)" fill="#21ff00" rx="36"></rect>
        <g transform="translate(-3 3.5) rotate(7 18 18)">
          <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#000000"></path>
          <rect x="12" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
          <rect x="22" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
        </g>
      </g>
    </svg>)
}

export default AvatarGreen

