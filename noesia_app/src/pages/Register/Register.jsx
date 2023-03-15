import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { usePostUser } from "../../hooks/user/usePostUser";

import Sidebar from '../../components/Sidebar/Sidebar';
import Cursor from "../../components/Cursor/Cursor"
import ButtonLink from '../../components/ButtonLink/ButtonLink'

import RegisterImg from '../../assets/images/register.png';
import './Register.scss'

const Register = () => {

  const { mutate, isLoading, isSuccess, isError, error } = usePostUser('users');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    accept_rgpd: false,
  });
  
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.password_confirmation && formData.accept_rgpd) {
      setIsPasswordInvalid(false);
      const { password_confirmation, accept_rgpd, ...DataWithoutPasswordConfirmation } = formData;
      const dataToSend = { user: DataWithoutPasswordConfirmation };
      mutate(dataToSend);
    } else {
      setIsPasswordInvalid(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/connexion');
    }
  }, [isSuccess, navigate]);

  return (
    <>
      <Cursor />
      <div className="register-wrapper">
        <div className="register-form">
          <form action="" onSubmit={handleSubmit}>
            <input type="text" name='username' placeholder="Nom d'utilisateur" value={formData.username} onChange={handleChange}/><br />
            <input type="email" name='email' placeholder='Email' value={formData.email} onChange={handleChange}/><br />
            <input type="password" name='password' placeholder='Mot de passe' value={formData.password} onChange={handleChange}/><br />
            <input type="password" name='password_confirmation' placeholder='Confirmer votre mot de passe' value={formData.password_confirmation} onChange={handleChange}/><br />
            

            <input
              type="checkbox"
              name="accept_rgpd"
              id="accept_rgpd"
              checked={formData.accept_rgpd}
              onChange={handleChange}
            />
            <label htmlFor="accept_rgpd">
            Veuillez accepter la politique de confidentialité RGPD. Pour en savoir plus sur la
              gestion de vos données personnelles et pour exercer vos droits, reportez-vous à
              la politique de confidentialité.
            </label><br />

            
            <button type="submit">S'inscrire</button>
            {isLoading && <div>Loading ...</div>}
            {isError && <div>Une erreur s'est produite : {error.message}</div>}
            {isSuccess && <div>Inscription réussie!</div>}
            {isPasswordInvalid && <div>Les mots de passe ne correspondent pas.</div>}
          </form>
        </div>
        <div className="register-side">
          <img src={RegisterImg} alt="Image d'une pyramide dans une jungle" />
          <ButtonLink content="J'ai déjà un compte" path="/connexion"/>
        </div>
        <Sidebar />
      </div>
    </>
  );
};

export default Register;
