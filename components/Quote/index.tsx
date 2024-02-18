'use client';
import React, { useState, useEffect } from 'react';
import quotes from '@data/quotes.json';

export const Quote: React.FC = () => {
	const [quoteIndex, setQuoteIndex] = useState<number>();

	useEffect(() => {
		setQuoteIndex(Math.floor(Math.random() * quotes.length));
	}, [quotes]);

	if (!quotes || typeof quoteIndex === 'undefined') {
		return null;
	}

	return (
		<blockquote className="text-center text-md my-10">
			<p className="mb-2">{quotes[quoteIndex].quote}</p>
			<cite className="block text-sm">- {quotes[quoteIndex].author}</cite>
		</blockquote>
	);
};
