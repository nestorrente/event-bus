/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest'
	},
	testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js',
		'jsx',
		'json',
		'node'
	]
};
