export default function LeviLogo({ size = 64, className = '' }) {
  return (
    <img
      src="/logo.jpeg"
      alt="Logo Tribu Lévi"
      width={size}
      height={size}
      className={className}
    />
  );
}