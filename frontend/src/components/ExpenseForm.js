// import React, { useState, useEffect } from "react";
// import Form from "react-bootstrap/Form";
// import Container from "react-bootstrap/Container";
// import Button from "react-bootstrap/Button";
// import { toast, ToastContainer } from "react-toastify"; // Import Toastify
// import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify

// function ExpenseForm() {
//   // State to store form data
//   const [categories, setCategories] = useState([]);
//   const [category, setCategory] = useState("");
//   const [name, setName] = useState("");
//   const [amount, setAmount] = useState("");
//   const [note, setNote] = useState("");
//   const [loading, setLoading] = useState(true); // State to handle loading state

//   // Fetch categories from backend when the component mounts
//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (categories.length === 0) {
//         // Check if categories are already fetched
//         try {
//           const response = await fetch(
//             "http://localhost:5000/api/v1/categories"
//           );
//           const data = await response.json();

//           if (data.success) {
//             setCategories(data.categories); // Store categories from response
//           } else {
//             toast.error("Failed to load categories.");
//           }
//         } catch (error) {
//           console.error("Error fetching categories:", error);
//           toast.error("Error fetching categories.");
//         } finally {
//           setLoading(false);
//         }
//       }
//     };
//     fetchCategories();
//   }, [categories]); // Dependency on categories to ensure it only fetches once

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     const expenseData = {
//       category,
//       name,
//       amount,
//       note,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/v1/expenses", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(expenseData),
//       });

//       if (response.ok) {
//         toast.success("Expense added successfully!"); // Display success toast
//         // Clear form
//         setCategory("");
//         setName("");
//         setAmount("");
//         setNote("");
//       } else {
//         toast.error("Failed to add expense.");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.error("Error submitting expense.");
//     }
//   };

//   return (
//     <Container className="my-5">
//       <ToastContainer />{" "}
//       <Form onSubmit={handleSubmit}>
//         <Form.Label className="mt-5">Category</Form.Label>
//         <Form.Select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="mb-5"
//           disabled={loading}
//         >
//           {loading ? (
//             <option>Loading categories...</option>
//           ) : (
//             categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.name}
//               </option>
//             ))
//           )}
//         </Form.Select>

//         <Form.Label>Name</Form.Label>
//         <Form.Control
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <Form.Label className="mt-5">Amount</Form.Label>
//         <Form.Control
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />

//         <Form.Label className="mt-5">Note</Form.Label>
//         <Form.Control
//           type="text"
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//         />

//         <Button type="submit" className="mt-5 mb-5">
//           Add Expense
//         </Button>
//       </Form>
//     </Container>
//   );
// }

// export default ExpenseForm;

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import styles for Toastify

function ExpenseForm() {
  // State to store form data
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Fetch categories from backend when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/categories");
        const data = await response.json();

        if (data.success) {
          setCategories(data.categories); // Store categories from response
        } else {
          toast.error("Failed to load categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run only on component mount

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate category selection
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const expenseData = {
      category,
      name,
      amount,
      note,
    };

    // Retrieve the auth token from localStorage
    const yourAuthToken = localStorage.getItem("token"); 

    // Check if token is available
    if (!yourAuthToken) {
      toast.error("Authentication token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourAuthToken}`, // Attach the token
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        toast.success("Expense added successfully!"); // Display success toast
        // Clear form
        setCategory("");
        setName("");
        setAmount("");
        setNote("");
      } else {
        toast.error("Failed to add expense.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting expense.");
    }
  };

  return (
    <Container className="my-5">
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Label className="mt-5">Category</Form.Label>
        <Form.Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-5"
          disabled={loading}
        >
          {loading ? (
            <option>Loading categories...</option>
          ) : (
            <>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </>
          )}
        </Form.Select>

        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Form.Label className="mt-5">Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Form.Label className="mt-5">Note</Form.Label>
        <Form.Control
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <Button type="submit" className="mt-5 mb-5">
          Add Expense
        </Button>
      </Form>
    </Container>
  );
}

export default ExpenseForm;
