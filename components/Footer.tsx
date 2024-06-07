import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"
import Link from "next/link"

const Footer = () => {
    const socialLinks = [
        {
            name: 'Facebook',
            link: 'https://www.facebook.com',
            icon: <Facebook size={20} color="blue"/>
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com',
            icon: <Instagram size={20} color="HotPink"/>
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com',
            icon: <Linkedin size={20} color="navy"/>
        },
        {
            name: 'Youtube',
            link: 'https://www.youtube.com',
            icon: <Youtube size={20} color="red"/>
        },
    ]
    return (
        <div className="flex bg-neutral-100  justify-between px-40 py-10">
            <div className="flex flex-col justify-evenly">
                <div>
                    Site Name
                </div>
                <div className="flex gap-5">
                    {/* socialLinks */}
                    {socialLinks.map((socialLink, index) => (
                        <Link href={socialLink.link} key={index} className="flex items-center p-1 rounded-full bg-neutral-200
                            
                        ">
                            {socialLink.icon}
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <table>
                    <thead className="">
                        <tr>
                            <th style={{ width: '200px' }}>Topic</th>
                            <th style={{ width: '200px' }}>Topic</th>
                            <th style={{ width: '200px' }}>Topic</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ height: '50px' }}>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                        </tr>
                        <tr style={{ height: '50px' }}>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                            <td style={{ height: '50px', textAlign: 'center' }}>page</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Footer