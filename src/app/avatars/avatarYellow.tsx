import { TAvatar } from './avatarType'

const AvatarYellow = ({ width = '40', height = '40', className }: TAvatar) => {
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
      <mask id=":r8:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <rect width="36" height="36" fill="#FFFFFF" rx="72"></rect>
      </mask>
      <g mask="url(#:r8:)">
        <rect width="36" height="36" fill="#21ff00"></rect>
        <rect x="0" y="0" width="36" height="36" transform="translate(0 0) rotate(324 18 18) scale(1)" fill="#f8ff38" rx="36"></rect>
        <g transform="translate(-4 -4) rotate(-4 18 18)">
          <path d="M15 19c2 1 4 1 6 0" stroke="#000000" fill="none" strokeLinecap="round"></path>
          <rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
          <rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
        </g>
      </g>
    </svg>)
}

export default AvatarYellow
