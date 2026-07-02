interface Props {
  className?: string;
}

export default function FjallLogo({ className = "h-8" }: Props) {
  return (
    <img
      src="./assets/fjall-group-logo.png"
      alt="Fjäll Group"
      className={className}
      style={{ objectFit: "contain" }}
      onError={(e) => {
        // Fallback to SVG if PNG fails
        const target = e.currentTarget;
        target.style.display = "none";
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `
            <svg viewBox="0 0 100 100" class="${className}" style="min-width:32px">
              <polygon points="5,45 50,18 95,45 70,60 50,48 30,60" fill="#4CD3B3"/>
              <polygon points="30,60 50,48 70,60 50,82" fill="#3D867C"/>
            </svg>
          `;
        }
      }}
    />
  );
}
