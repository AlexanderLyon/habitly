export const Input: React.FC<any> = ({ className, ...rest }) => (
	<input className={`px-2 py-2 rounded-lg ${className}`} {...rest} />
);
