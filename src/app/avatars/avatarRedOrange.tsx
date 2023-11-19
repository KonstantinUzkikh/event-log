import { TAvatar } from './avatarType'

const RedOrange = ({ width = '40', height = '40', className }: TAvatar) => {
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
      <mask id=":r31:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
      </mask>
      <g mask="url(#:r31:)">
        <rect width="36" height="36" fill="#ff005b"></rect>
        <rect x="0" y="0" width="36" height="36" transform="translate(9 -5) rotate(219 18 18) scale(1)" fill="#ffb238" rx="6"></rect>
        <g transform="translate(4.5 -3) rotate(-9 18 18)">
          <path d="M15 19c2 1 4 1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path>
          <rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
          <rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
        </g>
      </g>
    </svg>)
}

export default RedOrange
