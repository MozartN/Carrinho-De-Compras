'use client'
import React, { useState } from 'react'


interface ICurso {
    id: number,
    titulo: string,
    preco: number,
    imagem: string,
    categoria: string
}

interface IshoppingItem {
    produto: ICurso,
    quantidade: number
}

const cursos: ICurso[] = [
    { id: 1, titulo: 'Informática Básica', preco: 520.00, imagem: 'https://cfis.com.br/site/wp-content/uploads/2022/06/imagem-informatica-basica-e-avancada.png', categoria: 'Tecnologia' },
    { id: 2, titulo: 'Eletricista', preco: 600.00, imagem: 'https://static.wixstatic.com/media/1233ff_ca96ec225309492dbd2cef0b7ca9938f~mv2.jpg/v1/fill/w_980,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/1233ff_ca96ec225309492dbd2cef0b7ca9938f~mv2.jpg', categoria: 'Energia' },
    { id: 3, titulo: 'Mecânico de Motocicletas', preco: 720.00, imagem: 'https://s2-g1.glbimg.com/kuHDVr6YgAEZyu16yRVRW2AAPLM=/0x0:600x400/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/a/4/zRZBdATIukJiL2WsR27Q/mecanico-1.jpg', categoria: 'Mecânica' },
    { id: 4, titulo: 'Mecânico Automotivo', preco: 850.00, imagem: 'https://blog.nakata.com.br/wp-content/uploads/2022/01/post_thumbnail-2ad22e797653b79f57101e5e122a8c1d.jpeg', categoria: 'Mecânica' },
    { id: 5, titulo: 'Desenvolvimento Web', preco: 950.00, imagem: 'https://www.coopersystem.com.br/wp-content/uploads/2021/02/ilya-pavlov-OqtafYT5kTw-unsplash.jpg', categoria: 'Tecnologia' },
    { id: 6, titulo: 'Design Gráfico', preco: 700.00, imagem: 'https://s2-g1.glbimg.com/z7O63Q01CUicvJYsjZjVr05aRCs=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/m/D/DFYKn5QbSfiHCv21vUTA/foto-1-destaque-g1-unifor-design-grafico-e-digital.jpg', categoria: 'Tecnologia' },
    { id: 7, titulo: 'Marketing Digital', preco: 780.00, imagem: 'https://universodenegocios.com.br/wp-content/uploads/2023/04/tendencias-de-marketing-digital-em-2023-4.jpg', categoria: 'Tecnologia' },
    { id: 8, titulo: 'Análise de Dados', preco: 900.00, imagem: 'https://cdn.evg.gov.br/cursos/406_EVG/imagem_curso_406.png', categoria: 'Tecnologia' },
    { id: 9, titulo: 'Segurança da Informação', preco: 1_200.00, imagem: 'https://files.tecnoblog.net/wp-content/uploads/2014/11/cadeado-seguranca-700x432.jpg', categoria: 'Tecnologia' },
]

const categorias = ['Todos', 'Tecnologia', 'Energia', 'Mecânica'];

const MarketCarPages = () => {
    const [shoppingCurso, setShoppingCurso] = useState<IshoppingItem[]>([])
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>('Todos')
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
    
    const handleAddCurso = (id: number) => {
        const curso = cursos.find((curso) => curso.id === id)
        const cursoExistenteShopping = shoppingCurso.find(item => item.produto.id === id)

        if (cursoExistenteShopping) {
            const newShoppingCurso: IshoppingItem[] = shoppingCurso.map(item => {
                if (item.produto.id === id) {
                    return {
                        ...item,
                        quantidade: item.quantidade + 1
                    }
                }
                return item
            })
            setShoppingCurso(newShoppingCurso)
            return
        }

        const carItem: IshoppingItem = {
            produto: curso!,
            quantidade: 1
        }
        const newShoppingCurso: IshoppingItem[] = [...shoppingCurso, carItem]
        setShoppingCurso(newShoppingCurso)
    }

    const handleRemoveCurso = (id: number) => {
        const newShoppingCurso = shoppingCurso
            .map(item => {
                if (item.produto.id === id) {
                    return {
                        ...item,
                        quantidade: item.quantidade - 1
                    }
                }
                return item
            })
            .filter(item => item.quantidade > 0)

        setShoppingCurso(newShoppingCurso)
    }

    const calculateTotal = () => {
        return shoppingCurso.reduce((total, item) => total + item.produto.preco * item.quantidade, 0).toFixed(2)
    }

    const printShoppingCart = () => {
        const printContent = shoppingCurso
            .map(item => (
                `<p>Título: ${item.produto.titulo} | Preço: R$ ${item.produto.preco.toFixed(2)} | Quantidade: ${item.quantidade} | Total: R$ ${(item.produto.preco * item.quantidade).toFixed(2)}</p>`
            ))
            .join('')

        const printWindow = window.open('', '', 'height=600,width=800')
        if (printWindow) {
            printWindow.document.write('<html><head><title>Carrinho de Compras</title></head><body>')
            printWindow.document.write('<h1>Carrinho de Compras</h1>')
            printWindow.document.write(printContent)
            printWindow.document.write(`<h2>Valor Total: R$ ${calculateTotal()}</h2>`)
            printWindow.document.write('</body></html>')
            printWindow.document.close()
            printWindow.focus()
            printWindow.print()
        }
    }

    const cursosFiltrados = categoriaSelecionada === 'Todos'
        ? cursos
        : cursos.filter(curso => curso.categoria === categoriaSelecionada)

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f4f9' }}>
            {/* Cabeçalho */}
            <header style={{
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
                borderBottom: '4px solid #34495e'
            }}>
                <h1 style={{ margin: '0', fontSize: '30px', fontWeight: 'bold' }}>Loja de Cursos SENAI</h1>
            </header>

            <main style={{ flex: '1', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '26px' }}>Cursos Disponíveis</h2>
                
                {/* Filtro de Categorias */}
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="categoria" style={{ marginRight: '10px', fontSize: '18px', fontWeight: 'bold' }}>Categoria:</label>
                    <select
                        id="categoria"
                        value={categoriaSelecionada}
                        onChange={(e) => setCategoriaSelecionada(e.target.value)}
                        style={{ fontSize: '16px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                    >
                        {categorias.map(categoria => (
                            <option key={categoria} value={categoria}>{categoria}</option>
                        ))}
                    </select>
                </div>
        
                <ul style={{ listStyleType: 'none', padding: '0', width: '100%', maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {cursosFiltrados.map(curso => (
                        <li key={curso.id} style={{
                            flex: '1 1 calc(25% - 20px)',
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            cursor: 'pointer',
                            textAlign: 'center',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        >
                            <img src={curso.imagem} alt={curso.titulo} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                            <div style={{ marginTop: '15px' }}>
                                <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{curso.titulo}</p>
                                <p style={{ margin: '0', fontSize: '16px', color: '#666' }}>Preço: R$ {curso.preco.toFixed(2)}</p>
                            </div>
                            <button 
                    
                                onClick={() => handleAddCurso(curso.id)} 
                                style={{
                                    backgroundColor: '#3498db', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '12px 24px', 
                                    fontSize: '16px', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                                    outline: 'none',
                                    marginTop: '10px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2980b9';
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#3498db';
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                Adicionar
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        
            {/* Botão de Alternar Carrinho */}
            <button 
                onClick={() => setIsCartOpen(!isCartOpen)} 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#2ecc71',
                    color: 'white',
                    border: 'none',
                    padding: '15px 20px',
                    fontSize: '18px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                    outline: 'none',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'black';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#363636';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }}
            >
                🛒
            </button>

            {/* Carrinho de Compras */}
            {isCartOpen && (
                <div 
                    style={{
                        position: 'fixed', 
                        bottom: '80px', 
                        right: '20px', 
                        width: '400px', 
                        padding: '20px', 
                        backgroundColor: '#ffffff', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        transition: 'opacity 0.3s',
                        opacity: '0.9'
                    }}
                >
                    <h1 style={{ textAlign: 'left', color: '#333', fontSize: '22px', margin: '0 0 15px 0' }}>Carrinho de Compras</h1>
                    <ul style={{ listStyleType: 'none', padding: '0', width: '100%', marginBottom: '20px' }}>
                        {shoppingCurso.map((item) => (
                            <li key={item.produto.id} style={{ marginBottom: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#f9f9f9' }}>
                                <p style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Título: {item.produto.titulo}</p>
                                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Preço: R$ {item.produto.preco.toFixed(2)}</p>
                                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Quantidade: {item.quantidade}</p>
                                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Total: R$ {(item.produto.preco * item.quantidade).toFixed(2)}</p>
                                <button 
                                    onClick={() => handleRemoveCurso(item.produto.id)} 
                                    style={{
                                        backgroundColor: '#e74c3c', 
                                        color: 'white', 
                                        border: 'none', 
                                        padding: '8px 16px', 
                                        fontSize: '14px', 
                                        borderRadius: '4px', 
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                        transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                                        outline: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#c0392b';
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#e74c3c';
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                                    }}
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h2 style={{ textAlign: 'left', color: '#333', fontSize: '18px', margin: '10px 0' }}>Valor Total: R$ {calculateTotal()}</h2>
                    
                    <button 
                        onClick={printShoppingCart} 
                        style={{
                            backgroundColor: '#2ecc71', 
                            color: 'white', 
                            border: 'none', 
                            padding: '10px 20px', 
                            fontSize: '16px', 
                            borderRadius: '4px', 
                            cursor: 'pointer',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#27ae60';
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#2ecc71';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        Imprimir Carrinho
                    </button>
                </div>
            )}
            
            {/* Rodapé */}
            <footer style={{
                backgroundColor: '#ecf0f1',
                color: '#7f8c8d',
                padding: '15px 20px',
                textAlign: 'center',
                borderTop: '1px solid #ddd',
                marginTop: '20px',
                fontSize: '14px'
            }}>
                <p style={{ margin: '0' }}>© 2024 Loja de Cursos SENAI. Todos os direitos reservados.</p>
                <p style={{ margin: '5px 0 0' }}>
                    <a href="/contato" style={{ color: '#3498db', textDecoration: 'none', marginRight: '10px' }}>Contato</a>
                    <a href="/sobre" style={{ color: '#3498db', textDecoration: 'none' }}>Sobre</a>
                </p>
            </footer>
        </div>
        
        
    )
}

export default MarketCarPages
