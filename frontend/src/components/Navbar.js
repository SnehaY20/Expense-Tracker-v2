// // import React from "react";
// // import Nav from "react-bootstrap/Nav";
// // import Button from "react-bootstrap/Button";
// // import { Container, Row, Col } from "react-bootstrap"; // Import Container, Row, and Col for layout

// // function Navbar() {
// //   return (
// //     <Container fluid>
// //       <Row>
// //         <Col>
// //           <Nav variant="tabs" defaultActiveKey="/home">
// //             <Nav.Item>
// //               <Nav.Link href="/home">Expense Tracker</Nav.Link>
// //             </Nav.Item>
// //             <Nav.Item>
// //               <Nav.Link>Add Expense</Nav.Link>
// //             </Nav.Item>
// //             <Nav.Item>
// //               <Nav.Link>Expense History</Nav.Link>
// //             </Nav.Item>
// //             <Nav.Item>
// //               <Nav.Link>Dashboard</Nav.Link>
// //             </Nav.Item>
// //           </Nav>
// //         </Col>
// //         <Col className="d-flex justify-content-end align-items-center">
// //           <Button variant="outline-primary">Sign In</Button>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // }

// // export default Navbar;

// import React from "react";
// import { Nav } from "react-bootstrap";
// import { Link } from "react-router-dom"; // Import Link for routing
// import Button from "react-bootstrap/Button";
// import { Container, Row, Col } from "react-bootstrap"; // Import layout components

// function Navbar() {
//   return (
//     <Container fluid>
//       <Row>
//         <Col>
//           <Nav variant="tabs" defaultActiveKey="/home">
//             <Nav.Item>
//               <Nav.Link as={Link} to="/home">
//                 Expense Tracker
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link as={Link} to="/add-expense">
//                 Add Expense
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link as={Link} to="/expense-history">
//                 Expense History
//               </Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link as={Link} to="/dashboard">
//                 Dashboard
//               </Nav.Link>
//             </Nav.Item>
//           </Nav>
//         </Col>
//         <Col className="d-flex justify-content-end align-items-center">
//           <Button variant="outline-primary">Sign In</Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default Navbar;

import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import Link for routing
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap"; // Import layout components

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link as={Link} to="/home">
                Expense Tracker
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/add-expense">
                Add Expense
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/expense-history">
                Expense History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          {isAuthenticated ? (
            <Button variant="outline-danger" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button variant="outline-primary" as={Link} to="/login">
              Sign In
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Navbar;
