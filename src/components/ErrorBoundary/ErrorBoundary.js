import React from "react";
import Logo from "../Main/Header/Logo/Logo";

export default class ErrorBoundary extends React.Component {

    state = { hasError: false };
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    render() {
        if (this.state.hasError) {
            return (
            <div className="app-back">
                <h1>...unexpected...</h1>
                <h1>...something is REALLY wrong...</h1>
                <h2>...in this world...</h2>
                <div className="logo-back">
                    <Logo />
                </div>
                <h2>...but you can still enjoy playing with Parrot's wings!</h2>
            </div>)
        }
        return this.props.children;
    }
}