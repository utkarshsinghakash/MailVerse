import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../redux/authSlice";
import axios from "axios";
import { EMAIL_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { Button, Input } from "@mui/material";
import styled from "styled-components";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${EMAIL_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <Title>Login</Title>

        <InputWrapper>
          <Label>Email</Label>
          <StyledInput
            type="email"
            placeholder="Enter your email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Password</Label>
          <StyledInput
            type="password"
            placeholder="Enter your password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
          />
        </InputWrapper>

        <StyledButton type="submit">
          {loading ? "Logging in..." : "Login"}
        </StyledButton>

        <SignUpText>
          Don't have an account? <StyledLink to="/signup">Sign up</StyledLink>
        </SignUpText>
      </StyledForm>
    </Container>
  );
};

export default Login;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: linear-gradient(to bottom right, #4f46e5, #d946ef, #ec4899);
`;

const StyledForm = styled.form`
  background-color: white;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 2rem;
  max-width: 20rem;
  width: 100%;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05) translateY(-0.5rem);
  }
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  color: #7c3aed;
  margin-bottom: 2rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  color: #4b5563;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled(Input)`
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.75rem;
  width: 100%;
  &:focus {
    outline: none;
    border-color: #a855f7;
    box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.4);
  }
`;

const StyledButton = styled(Button)`
  background: linear-gradient(to right, #8b5cf6, #a855f7);
  color: white;
  width: 100%;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  transition: background 0.3s;
  &:hover {
    background: linear-gradient(to right, #7e22ce, #9333ea);
  }
`;

const SignUpText = styled.span`
  display: block;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 1rem;
`;

const StyledLink = styled(Link)`
  color: #8b5cf6;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;
