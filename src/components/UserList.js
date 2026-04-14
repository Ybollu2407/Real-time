import React from 'react';
import styled from 'styled-components';

const UserListContainer = styled.div`
  height: 100%;
`;

const Title = styled.h3`
  color: #333;
  margin: 0 0 20px 0;
  font-size: 1.2rem;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #e1e5e9;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: ${props => props.isCurrentUser ? 'rgba(102, 126, 234, 0.1)' : 'white'};
  border-radius: 12px;
  border: 1px solid ${props => props.isCurrentUser ? '#667eea' : '#e1e5e9'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
`;

const Status = styled.div`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  background: #4ade80;
  border-radius: 50%;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const CurrentUserBadge = styled.span`
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
`;

const EmptyText = styled.p`
  margin: 0;
  line-height: 1.6;
`;

const UserList = ({ users, currentUser }) => {
  const sortedUsers = [...users].sort((a, b) => {
    // Current user first
    if (a.id === currentUser?.id) return -1;
    if (b.id === currentUser?.id) return 1;
    // Then alphabetically by username
    return a.username.localeCompare(b.username);
  });

  return (
    <UserListContainer>
      <Title>👥 Online Users ({users.length})</Title>
      
      {users.length === 0 ? (
        <EmptyState>
          <EmptyText>No users online</EmptyText>
        </EmptyState>
      ) : (
        sortedUsers.map((user) => (
          <UserItem 
            key={user.id} 
            isCurrentUser={user.id === currentUser?.id}
          >
            <UserAvatar color={user.color}>
              {user.username.charAt(0).toUpperCase()}
            </UserAvatar>
            
            <UserInfo>
              <Username>
                {user.username}
                {user.id === currentUser?.id && (
                  <CurrentUserBadge>You</CurrentUserBadge>
                )}
              </Username>
              <Status>
                <StatusDot />
                Online
              </Status>
            </UserInfo>
          </UserItem>
        ))
      )}
    </UserListContainer>
  );
};

export default UserList;
