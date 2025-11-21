// "use client";

// import { useEffect, useState } from "react";

// export default function AdminPage() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   async function loadUsers() {
//     const res = await fetch("/api/admin/users");
//     const data = await res.json();
//     setUsers(data.users);
//   }

//   async function logoutUser(id) {
//     await fetch("/api/admin/logout-user", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_id: id }),
//     });

//     alert("User Logged Out!");
//     loadUsers();
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Logout</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id} className="border">
//               <td>{u.id}</td>
//               <td>{u.first_name} {u.last_name}</td>
//               <td>{u.email}</td>
//               <td>
//                 <button
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                   onClick={() => logoutUser(u.id)}
//                 >
//                   Force Logout
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data.users);
    }

    async function toggleBlock(user_id, isBlock) {
        await fetch("/api/admin/logout-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, isBlock }),
        });

        alert(isBlock ? "User blocked!" : "User unblocked!");
        loadUsers();
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-200">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border">
                            <td>{u.id}</td>
                            <td>{u.first_name} {u.last_name}</td>
                            <td>{u.email}</td>
                            <td>{u.blocked ? "Blocked" : "Active"}</td>
                            <td>
                                <button
                                    className={`px-3 py-1 rounded text-white ${u.blocked ? "bg-green-500" : "bg-red-500"}`}
                                    onClick={() => toggleBlock(u.id, !u.blocked)}
                                >
                                    {u.blocked ? "Unblock" : "Block & Logout"}
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
