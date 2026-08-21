import React, { Component } from 'react';
import { generateWhatsAppLink } from '../../utils/whatsapp';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full border border-slate-100">
            <span className="text-6xl mb-4 block">⚠️</span>
            <h2 className="text-2xl font-bold text-dark mb-3">Something went wrong</h2>
            <p className="text-slate-600 mb-6">
              Our system encountered an unexpected error. Don't worry, your data is safe. Please reload the page or connect with our support expert directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-full font-semibold border border-slate-200 hover:bg-slate-50 transition"
              >
                Reload Page
              </button>
              <a
                href={generateWhatsAppLink('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full font-semibold bg-primary text-white hover:bg-primary-dark transition shadow-md shadow-primary/20"
              >
                Contact Support via WhatsApp
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
