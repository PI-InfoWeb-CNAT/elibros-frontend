"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function RegistroPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    // Informações pessoais
    nome: '',
    email: '',
    CPF: '',
    telefone: '',
    dt_nasc: '',
    // Criação da conta
    username: '',
    password: '',
    password_confirm: ''
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // Validação básica
    const newErrors: string[] = [];
    
    // Validar campos obrigatórios
    if (!formData.nome) newErrors.push('Nome é obrigatório');
    if (!formData.email) newErrors.push('Email é obrigatório');
    if (!formData.CPF) newErrors.push('CPF é obrigatório');
    if (!formData.telefone) newErrors.push('Telefone é obrigatório');
    if (!formData.dt_nasc) newErrors.push('Data de nascimento é obrigatória');
    if (!formData.username) newErrors.push('Nome de usuário é obrigatório');
    if (!formData.password) newErrors.push('Senha é obrigatória');
    if (!formData.password_confirm) newErrors.push('Confirmação de senha é obrigatória');
    
    // Validar confirmação de senha
    if (formData.password && formData.password_confirm && formData.password !== formData.password_confirm) {
      newErrors.push('As senhas não coincidem');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.push('Email inválido');
    }

    // Validar CPF básico (apenas formato)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    if (formData.CPF && !cpfRegex.test(formData.CPF)) {
      newErrors.push('CPF inválido (use o formato 000.000.000-00 ou 11 dígitos)');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      await register({
        email: formData.email,
        username: formData.username,
        nome: formData.nome,
        CPF: formData.CPF,
        telefone: formData.telefone,
        dt_nasc: formData.dt_nasc,
        password: formData.password,
        password_confirm: formData.password_confirm
      });
      
      // Sucesso - redirecionar para a página inicial (já está logado automaticamente)
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('já existe')) {
          setErrors(['Este email ou nome de usuário já está em uso']);
        } else {
          setErrors([error.message]);
        }
      } else {
        setErrors(['Erro ao criar conta. Tente novamente.']);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      backgroundImage: "url('/images/fundoacesso.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center">
          {/* Header logo */}
          <header className="flex justify-center bg-transparent border-0 p-0 mb-8">
            <Link href="/">
              <Image
            src="/images/logoacesso.png"
            alt="logo eLibros"
            width={160}
            height={80}
            className="w-80"
          />
        </Link>
      </header>

      {/* Main Content */}
        <section className="flex justify-between bg-[#FFFFF5] rounded-lg w-full max-w-6xl p-16">
          
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-10">
              {errors.map((error, index) => (
                <p key={index} className="text-sm mb-1 last:mb-0">
                  {error}
                </p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex w-full gap-12">
            {/* Left Side - Informações Pessoais */}
            <div className="flex-1">
              <h2 className="text-xl font-normal mb-6 text-[#1C1607]">
                Informações pessoais obrigatórias
              </h2>

              {/* Nome */}
              <div className="mb-4">
                <label htmlFor="nome" className="block text-[#1C1607] text-base mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="border border-[#E5E7EB] rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                  placeholder="Seu nome completo"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-[#1C1607] text-base mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border border-[#E5E7EB] rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {/* CPF e Telefone */}
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label htmlFor="CPF" className="block text-[#1C1607] text-base mb-1">
                    CPF
                  </label>
                  <input
                    type="text"
                    id="CPF"
                    name="CPF"
                    value={formData.CPF}
                    onChange={handleInputChange}
                    className="border border-[#E5E7EB] rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="telefone" className="block text-[#1C1607] text-base mb-1">
                    Tel.
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="border border-[#E5E7EB] rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </div>

              {/* Data de Nascimento */}
              <div className="mb-4 w-2/5">
                <label htmlFor="dt_nasc" className="block text-[#1C1607] text-base mb-1">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  id="dt_nasc"
                  name="dt_nasc"
                  value={formData.dt_nasc}
                  onChange={handleInputChange}
                  className="border border-[#E5E7EB] rounded-md px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-black"></div>

            {/* Right Side - Criação da Conta */}
            <div className="flex-1">
              <h2 className="text-xl font-normal mb-6 text-[#1C1607]">
                Criação da conta
              </h2>

              {/* Nome de usuário */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-[#1C1607] text-base mb-1">
                  Nome de usuário
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="border border-[#E5E7EB] rounded-md px-4 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                  placeholder="usuario123"
                  required
                />
              </div>

              {/* Senha */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-[#1C1607] text-base mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border border-[#E5E7EB] rounded-md px-4 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                  placeholder="Sua senha"
                  required
                />
              </div>

              {/* Confirmar Senha */}
              <div className="mb-6">
                <label htmlFor="password_confirm" className="block text-[#1C1607] text-base mb-1">
                  Confirme sua senha
                </label>
                <input
                  type="password"
                  id="password_confirm"
                  name="password_confirm"
                  value={formData.password_confirm}
                  onChange={handleInputChange}
                  className="border border-[#E5E7EB] rounded-md px-4 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-[#FFD147] focus:border-transparent"
                  placeholder="Confirme sua senha"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#1C1607] text-white text-center rounded-lg text-base font-light w-full py-3 px-14 mt-5 hover:bg-[#2a2110] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Criando conta...' : 'Criar conta'}
              </button>

              {/* Link para login */}
              <p className="text-base font-light text-center mt-6">
                Já possui uma conta?{' '}
                <Link href="/login" className="text-[#FFD147] no-underline font-medium hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </form>
        </section>
        </div>
      </main>
    </div>
  );
}
