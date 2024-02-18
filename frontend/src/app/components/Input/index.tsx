interface InputProps {
	type: string;
	placeholder?: string;
	autoComplete?: string;
	id?: string;
	name?: string;
	value?: string;
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = props => {
	return (
		<input
			className={`px-2 py-1.5 rounded-lg ${props.className}`}
			type={props.type}
			placeholder={props.placeholder}
			autoComplete={props.autoComplete}
			id={props.id}
			name={props.name}
			value={props.value}
			onChange={props.onChange}
		/>
	);
};
