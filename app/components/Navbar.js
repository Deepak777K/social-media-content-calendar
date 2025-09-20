// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
	return (
		<nav style={{
			background: '#333',
			padding: '1rem',
			display: 'flex',
			justifyContent: 'center',
			gap: '2rem'
		}}>
			<Link href="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem' }}>
				Home
			</Link>
			<Link href="/overview" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.2rem' }}>
				Overview
			</Link>
		</nav>
	);
};

export default Navbar;