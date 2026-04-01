'use client';

import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import CommentsPanel from '@/components/shared/CommentsPanel';
import ShareModal from '@/components/shared/ShareModal';
import PinupBoard from '@/components/pinup/PinupBoard';
import DrawingBoard from '@/components/drawing/DrawingBoard';
import RenderingView from '@/components/rendering/RenderingView';
import PostProcessingView from '@/components/postprocessing/PostProcessingView';
import PresentationView from '@/components/presentation/PresentationView';
import { useWorkspace } from '@/store/workspace';

const workspaceViews = {
  pinup: PinupBoard,
  drawing: DrawingBoard,
  rendering: RenderingView,
  postprocessing: PostProcessingView,
  presentation: PresentationView,
};

export default function Home() {
  const { activeTab } = useWorkspace();
  const ActiveView = workspaceViews[activeTab];

  return (
    <div className="h-screen flex flex-col">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <ActiveView />
        <CommentsPanel />
      </div>
      <ShareModal />
    </div>
  );
}
