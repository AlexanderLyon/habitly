interface ButtonProps {
	children: React.ReactNode;
	type?: 'button' | 'submit';
	className?: string;
	disabled?: boolean;
	onClick?: (e: any) => void;
}

export const Button: React.FC<ButtonProps> = props => {
	return (
		<button
			className={`bg-gunmetal text-white px-5 py-1.5 rounded-lg ${props.className}`}
			type={props.type}
			disabled={props.disabled}
			onClick={e => props.onClick && props.onClick(e)}
		>
			{props.children}
		</button>
	);
};
