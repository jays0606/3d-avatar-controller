import { AvatarCreator, EditorConfig } from "@readyplayerme/rpm-react-sdk";

const config: EditorConfig = {
  clearCache: true,
  bodyType: "fullbody",
  quickStart: false,
  language: "en",
};

interface ReadyPlayerCreatorProps {
  handleComplete: (url: string) => void;
}

const ReadyPlayerCreator = ({ handleComplete }: ReadyPlayerCreatorProps) => {
  return (
    <div
      className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 flex items-center justify-center w-3/4 h-3/4"
      style={{ zIndex: 1 }}
    >
      <AvatarCreator
        subdomain="demo"
        editorConfig={config}
        onAvatarExported={handleComplete}
      />
    </div>
  );
};

export default ReadyPlayerCreator;
