//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| SCM :: Abstract Interface
//|| Mysql :: Table Blogs
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

export default interface TableBlogs {
        id_blog: number;
        fid_user?: number;
        fid_media_profile?: number;
        fid_media_cover?: string;
        fid_area?: number;
        blog_area?: string;
        blog_title?: string;
        blog_text?: string;
        blog_timestamp?: Date;
        blog_permissions?: string;
    }
    