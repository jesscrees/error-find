import styles from './Button.module.css'

function Button({
  label,
  onClick
}: {
  label: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      className={`${styles.button}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
