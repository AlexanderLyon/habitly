import { Dashboard } from '@components/Dashboard';
import { Quote } from '@components/Quote';

const Home = () => {
	return (
		<>
			<div className="max-w-6xl w-full items-center justify-between text-sm">
				<Dashboard />
			</div>
			<Quote />
		</>
	);
};

export default Home;
