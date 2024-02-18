interface ButtonProps {
	children: React.ReactNode;
	type?: 'button' | 'submit';
	condensed?: boolean;
	className?: string;
	disabled?: boolean;
	onClick?: (e: any) => void;
}

export const Button: React.FC<ButtonProps> = ({ children, condensed, className, ...rest }) => (
	<button
		className={`bg-buttonBackground text-buttonForeground text-sm font-semibold align-middle rounded-lg ${condensed ? 'p-2 leading-none' : 'px-5 py-2'} ${className}`}
		{...rest}
	>
		{children}
	</button>
);
