interface AlertProps {
	children: React.ReactNode;
	variant: 'success' | 'error' | 'info';
	className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className, variant }) => (
	<p
		className={`inline-block ${variant === 'success' ? 'bg-green-700' : 'bg-red-500'} text-white px-3 py-3 ${className}`}
	>
		{children}
	</p>
);
