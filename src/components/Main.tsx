/* eslint-disable react/react-in-jsx-scope */

import Board from './Board';

interface MainProps {
  searchKey: string;
}

const Main: React.FC<MainProps> = ({ searchKey }) => {
  return (
    <main
      className="flex-1 overflow-hidden shadow-md"
      style={{
        backgroundColor: 'var(--main-bg-color)', // Dynamic background based on theme
        color: 'var(--text-color)', // Dynamic text color based on theme
      }}
    >
      <div className="py-4 px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Amiel Hussien Dagadas {new Date().toString()}</h2>
          <button className="flex items-center rounded-md px-3 py-1.5 text-sm transition-colors">
            <span className="mr-1">Customize</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>
      </div>
      <Board searchKey={searchKey} />
    </main>
  );
};

export default Main;
