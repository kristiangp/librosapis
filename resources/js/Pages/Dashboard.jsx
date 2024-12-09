import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p>You're logged in!</p>
                            <nav className="mt-4">
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/" className="text-blue-500 hover:underline">
                                            Página Principal
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/libros/create" className="text-blue-500 hover:underline">
                                            Crear Libro
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/categorias/create" className="text-blue-500 hover:underline">
                                            Crear Categoría
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/profile" className="text-blue-500 hover:underline">
                                            Perfil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/dashboard" className="text-blue-500 hover:underline">
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
