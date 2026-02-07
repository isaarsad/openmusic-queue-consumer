import { Pool } from 'pg';

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `SELECT 
              p.id, 
              p.name, 
              COALESCE(
                json_agg(
                  json_build_object(
                    'id', s.id,
                    'title', s.title,
                    'performer', s.performer
                  ) ORDER BY s.title ASC
                ) FILTER (WHERE s.id IS NOT NULL), '[]'
              ) as songs
            FROM playlists p
            LEFT JOIN playlist_songs ps ON p.id = ps.playlist_id
            LEFT JOIN songs s ON ps.song_id = s.id
            WHERE p.id = $1
            GROUP BY p.id`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows[0];
  }
}

export default PlaylistsService;
