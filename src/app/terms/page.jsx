import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last Updated: December 7, 2025</p>
        
        {/* Content will be added here */}
        <div className="prose prose-lg max-w-none text-gray-700">
          <p className="text-gray-600 italic">
            Content will be provided here...
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

