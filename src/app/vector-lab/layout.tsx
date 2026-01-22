import { Metadata } from 'next';
import { vectorLabMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = vectorLabMetadata;

export default function VectorLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
