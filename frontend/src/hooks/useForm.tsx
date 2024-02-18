import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
	// Create a state object for our inputs
	const [inputs, setInputs] = useState<any>(initial);
	const initialValues = Object.values(initial).join('');

	useEffect(() => {
		setInputs(initial);
	}, [initialValues]);

	const handleChange = (e: React.ChangeEvent<any>) => {
		let { value, name, type } = e.target;

		if (type === 'number') {
			value = parseFloat(value);
		}

		if (type === 'file') {
			[value] = e.target.files;
		}

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	const resetForm = () => {
		setInputs(initial);
	};

	const clearForm = () => {
		const blankArr = Object.entries(inputs).map(([key, value]) => [key, '']);
		const blankObj = Object.fromEntries(blankArr);
		setInputs(blankObj);
	};

	// Return the things we want to surface from this custom hook
	return {
		inputs,
		handleChange,
		clearForm,
		resetForm,
	};
}
