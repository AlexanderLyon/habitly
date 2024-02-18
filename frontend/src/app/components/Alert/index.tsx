interface AlertProps {
	children: React.ReactNode;
	className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className }) => {
	return <p className={`inline-block bg-red-500 text-white px-3 py-3  ${className}`}>{children}</p>;
};
