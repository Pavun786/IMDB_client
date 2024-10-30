import { useState } from "react";

const ErrorBoundary = ({ children }) => {
   const [hasError, setHasError] = useState(false);

   const handleError = () => setHasError(true);

   try {
      if (hasError) {
         throw new Error("Something went wrong.");
      }
      return children;
   } catch (error) {
      handleError();
      return (
         <div
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               height: "100vh",
            }}
         >
            <h2>Something went wrong. Please try again later.</h2>
         </div>
      );
   }
};

export default ErrorBoundary;
