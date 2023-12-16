import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../../redux/actions/users.actions';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@nextui-org/react';
export const UserProfile = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const { success, error: updateUserError } = useAppSelector(
    (state) => state.updateOneUser,
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    created_at: '',
    comments: [
      {
        article: {
          title: '',
        },
        content: '',
      },
    ],
  });

  useEffect(() => {
    id && dispatch(getUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setInputs({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role?.name,
        created_at: new Date(user.created_at).toLocaleDateString('de-DE'),
        comments: user.comments,
      });
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: 'UPDATE_USER_RESET' });
      }, 2000);
    }
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const resetInputs = () => {
    if (user) {
      setInputs({
        id: user.id.toString(),
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role?.name,
        created_at: new Date(user.created_at).toLocaleDateString('de-DE'),
        comments: user.comments,
      });
    }
  };

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <>{error}</>
      ) : (
        inputs && (
          <>
            {success && (
              <Modal isOpen={success}>
                <ModalContent>
                  <ModalHeader>Success</ModalHeader>
                  <ModalBody>
                    User updated successfully. Closing modal...
                  </ModalBody>
                </ModalContent>
              </Modal>
            )}
            {updateUserError && (
              <Modal isOpen={updateUserError}>
                <ModalContent>
                  <ModalHeader>Error</ModalHeader>
                  <ModalBody>{updateUserError}</ModalBody>
                </ModalContent>
              </Modal>
            )}
            <div className="flex flex-col md:flex-row w-full gap-3">
              <div className="flex flex-col gap-5 md:w-1/2">
                <h1 className="text-3xl font-bold">User Profile</h1>
                <div className="flex flex-col gap-2">
                  <Input
                    label="Username"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                    isReadOnly={!isEditing}
                  />
                  <Input
                    label="First Name"
                    name="first_name"
                    value={inputs.first_name}
                    onChange={handleChange}
                    isReadOnly={!isEditing}
                  />
                  <Input
                    label="Last Name"
                    name="last_name"
                    value={inputs.last_name}
                    onChange={handleChange}
                    isReadOnly={!isEditing}
                  />
                  <Input
                    label="Email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    isReadOnly={!isEditing}
                  />
                  <Input
                    label="Role"
                    value={inputs.role}
                    name="role"
                    isReadOnly
                  />
                  <Input
                    label="Joined at"
                    value={inputs.created_at}
                    name="role"
                    isReadOnly
                  />
                </div>
                <div className="flex items-start gap-2">
                  {isEditing && (
                    <Button
                      color="primary"
                      onClick={() => {
                        dispatch(updateUser(inputs.id, inputs));
                        setIsEditing(false);
                      }}
                    >
                      Save
                    </Button>
                  )}
                  <Button
                    color={isEditing ? 'default' : 'primary'}
                    onClick={() => {
                      if (isEditing) {
                        resetInputs();
                      }
                      setIsEditing(!isEditing);
                    }}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
              </div>
              {user.role?.name != 'Admin' && (
                <div className="flex flex-col w-full md:w-1/2 gap-5">
                  <h1 className="text-3xl font-bold">
                    {user.role?.name == 'Editor'
                      ? 'Published articles'
                      : 'Posted comments'}
                  </h1>
                  <div className="flex flex-col gap-2 h-[500px] overflow-y-scroll">
                    {user.role?.name == 'User' &&
                      inputs?.comments?.map((comment, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                          <div className="flex flex-col gap-2">
                            <Input
                              label={`Article: ${comment.article.title.slice(
                                0,
                                20,
                              )}...`}
                              value={comment.content}
                              isReadOnly
                            />
                          </div>
                        </div>
                      ))}
                    {user.role?.name == 'Editor' &&
                      user.user_authors?.map((user_author, index) => (
                        <div className="flex flex-col gap-2" key={index}>
                          <div className="flex flex-col gap-2">
                            <Link
                              to={`/${user_author.article.category.name}/${user_author.article.slug}/${user_author.article.id}`}
                            >
                              <Input
                                label={`Article: ${user_author.article.title.slice(
                                  0,
                                  20,
                                )}...`}
                                value={user_author.article.title}
                                isReadOnly
                                style={{ cursor: 'pointer' }}
                              />
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )
      )}
    </>
  );
};
