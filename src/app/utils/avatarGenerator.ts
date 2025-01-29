// 平台初始头像生成器
const PRESET_AVATARS = Array.from({ length: 10 }, (_, i) => `/images/avatars/preset-${i + 1}.jpg`);

export function getRandomAvatar(): string {
  return PRESET_AVATARS[Math.floor(Math.random() * PRESET_AVATARS.length)];
}

export const PRESET_AVATARS_LIST = PRESET_AVATARS; 