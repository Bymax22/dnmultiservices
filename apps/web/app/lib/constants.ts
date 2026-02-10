import { FiHome, FiBriefcase, FiPackage, FiTarget, FiInfo, FiShield, FiMail, FiTruck, FiZap, FiDroplet } from 'react-icons/fi';
import { FaHardHat, FaOilCan } from 'react-icons/fa';
import { GiMining } from 'react-icons/gi';

export const heroSlides = [
  {
    title: 'Integrated Industrial Services & Supplies',
    subtitle: 'Across DRC & Zambia',
    image: "bg-[url('/hero-mining.webp')]",
  },
  {
    title: 'Reliable Mining & Engineering Solutions',
    subtitle: 'Built on Safety, Quality & Performance',
    image: "bg-[url('/hero-engineering.jpg')]",
  },
  
  {
    title: 'Electrical Services',
    subtitle: 'Industrial electrical installations and maintenance',
    image: "bg-[url('/electrical1.jpg')]",
  },
    {
    title: 'Energy, Logistics & Infrastructure Support',
    subtitle: 'Powering Industrial Growth in the Region',
    image: "bg-[url('/hero-energy.jpg')]",
  },
      {
    title: 'Agricultural Equipment Supply',
    subtitle: 'Agricultural machinery for land preparation and large-scale farming operations',
    image: "bg-[url('/agric.jpg')]",
  },
        {
    title: 'Supply of Spare Parts & PPES',
    subtitle: 'Reliable sourcing and delivery of genuine spare parts for pumps, gearboxes, valves, and mining equipment.',
    image: "bg-[url('/ppe.jpg')]",
  },
];

export const services = [
  {
    title: 'Mining Services & Supplies',
    description: 'Comprehensive mining support with high-quality supplies and expert technical assistance.',
    icon: GiMining,
  },
  {
    title: 'Engineering & Construction',
    description: 'Professional engineering solutions and construction management for industrial projects.',
    icon: FaHardHat,
  },
  {
    title: 'Transportation & Logistics',
    description: 'Efficient logistics and transportation services across DRC and Zambia.',
    icon: FiTruck,
  },
  {
    title: 'Energy & Electrical Solutions',
    description: 'Reliable energy systems and electrical infrastructure support.',
    icon: FiZap,
  },
  {
    title: 'Water & Infrastructure Systems',
    description: 'Sustainable water management and infrastructure development.',
    icon: FiDroplet,
  },
  {
    title: 'Petroleum & Related Products',
    description: 'Quality petroleum products and supply chain management.',
    icon: FaOilCan,
  },
];

export const features = [
  'DRC & Zambia Operations',
  'Mining & Industrial Focus',
  'QHSE Compliant',
  'Reliable Supply Chains',
];

export const navItems = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Services', href: '/services', icon: FiBriefcase },
  { label: 'Supplies', href: '/supplies', icon: FiPackage }, 
  { label: 'Projects', href: '/projects', icon: FiTarget },
  { label: 'About', href: '/about', icon: FiInfo },
  { label: 'QHSE', href: '/qhs', icon: FiShield },
  { label: 'Contact', href: '/contact', icon: FiMail },
];