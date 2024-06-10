import React from 'react';

import styles from './index.module.sass';

function NumberBlock({ setFormData, icon, keyName, value, words }) {
	return (
		<>
			<div className={styles.numberBlock}>
				{keyName && value && (
					<button
						className={styles.numberBlock_btn}
						onClick={(e) => {
							e.preventDefault();
							setFormData((prev) => ({
								...prev,
								[keyName]: value > 1 ? value - 1 : 1,
							}));
						}}>
						-
					</button>
				)}

				<div className={styles.numberBlock_content}>
					<div className={styles.numberBlock_content_icon}>{icon}</div>
					<p>
						{value} {value <= 1 ? words[0] : words[1]}
					</p>
				</div>

				{keyName && value && (
					<button
						className={styles.numberBlock_btn}
						onClick={(e) => {
							e.preventDefault();
							setFormData((prev) => ({
								...prev,
								[keyName]: value >= 1 ? value + 1 : 1,
							}));
						}}>
						+
					</button>
				)}
			</div>
		</>
	);
}

export default NumberBlock;
