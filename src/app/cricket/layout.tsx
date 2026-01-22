import { Metadata } from 'next';
import { cricketMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = cricketMetadata;

export default function CricketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
