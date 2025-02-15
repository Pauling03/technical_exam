import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="h-screen">
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-lg text-gray-600">Page not found</p>

        <Link
          to="/"
          className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg
                     hover:bg-gray-700 active:bg-gray-800 
                     transition duration-150 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

{
  /* Alternative Button Styles (uncomment to use):
        
        //Primary Button
        <Link 
          to="/" 
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg
                     hover:bg-blue-700 active:bg-blue-800 
                     transition duration-150 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back Home
        </Link>

        // Secondary Button
        <Link 
          to="/" 
          className="px-6 py-2.5 bg-gray-600 text-white font-medium rounded-lg
                     hover:bg-gray-700 active:bg-gray-800 
                     transition duration-150 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Go Back Home
        </Link>

        // Outlined Button
        <Link 
          to="/" 
          className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-medium rounded-lg
                     hover:bg-blue-50 active:bg-blue-100 
                     transition duration-150 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Back Home
        </Link>
        */
}
