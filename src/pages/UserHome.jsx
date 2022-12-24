import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentRoles, selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice'

const UserHome = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);
    const roles = useSelector(selectCurrentRoles);

    return (
        <div>
            <h1>Hello {user}!</h1>
            <h3>Your token is {token?.slice(0, 9)}...</h3>
            <p>
                <ul>
                    {
                        roles?.map((role, key) => {
                            return (
                                <li key={key}>{role}</li>
                            )
                        })
                    }
                </ul>
            </p>
        </div>
    )
}

export default UserHome