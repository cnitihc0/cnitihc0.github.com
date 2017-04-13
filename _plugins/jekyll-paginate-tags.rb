
module Jekyll
  module Paginate
    module Tag
      
      class Pagination < Generator
        safe true
        priority :lowest

        def generate(site)
          if Paginate::Pager.pagination_enabled?(site)
            site.tags.each do |tag, posts|
              total = Paginate::Pager.calculate_pages(posts, site.config['paginate'])
              (1..total).each do |i|
                site.pages << IndexPage.new(site, tag, i)
              end
            end
          end
        end
      end

      class IndexPage < Page
        def initialize(site, tag, num_page)
          @site = site
          @base = site.source

          tag_dir = site.config['tag_dir'] || 'tag'
          @dir = File.join(tag_dir, tag)

          @name = Paginate::Pager.paginate_path(site, num_page)
          @name.concat '/' unless @name.end_with? '/'
          @name += 'index.html'

          self.process(@name)

          tag_layout = site.config['tag_layout'] || 'index.html'
          self.read_yaml(@base, tag_layout)
          
          self.data.merge!(
                           'title'     => tag,
                           'paginator' => Paginate::Pager.new(site, num_page, site.tags[tag])
                          )
        end

        def template
          '/:path/:basename:output_ext'
        end
      end
      
    end
  end
end
