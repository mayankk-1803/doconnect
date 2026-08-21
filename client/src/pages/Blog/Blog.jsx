import React, { useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import blogsData from '../../data/blogs.json';
import BlogCard from '../../components/cards/BlogCard';
import { Search, Library, FileQuestion } from 'lucide-react';
import Button from '../../components/ui/Button';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const breadcrumbItems = [{ label: 'Health Library', path: '/blog' }];

  const categories = ['All', 'Health', 'Insurance', 'Tax Saving', 'Claims'];

  // Filter articles dynamically
  const filteredBlogs = useMemo(() => {
    return blogsData.filter((blog) => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <SEO
        title="Health & Insurance Blog Library"
        description="Read educational articles about health insurance coverage, claims filing, tax savings, and wellness guidelines from our experts."
        keywords="health insurance articles, tax saving tips, claims assistance blogs"
        path="/blog"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-2">
            SecureHealth Knowledge Center
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mt-1.5">
            Your comprehensive reference library for health topics, insurance terms, claims timelines, and Section 80D tax declarations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Categories Filters */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm mb-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition rounded-2xl text-sm"
              />
            </div>

            {/* Category Badges Filters */}
            <div className="md:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/10'
                      : 'bg-slate-50 border border-slate-100 hover:border-slate-200 text-slate-600 hover:text-dark'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Blog Listing Grid */}
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3.5 flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Articles Available: {filteredBlogs.length}</span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50">
              <Library className="w-3.5 h-3.5 text-primary" />
              Free Knowledge Library
            </span>
          </div>

          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
              <FileQuestion className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-display font-bold text-dark text-lg mb-2">No Articles Found</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                Try searching other keywords (e.g. cardiac, premium) or resetting category badges filters.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                variant="primary"
                size="md"
              >
                Clear Search filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Blog;
